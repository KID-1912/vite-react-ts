import { Layout } from "antd";
import styles from "./sidebar.module.scss";
import { INBOX, TODAY_FILTER, RECENT_FILTER, TASK_GROUP_NAME_MAP } from "@/constants/TASK_GROUP.ts";
import AddProjectModal from "../AddProjectModal/AddProjectModal.tsx";
import { ProjectListContext } from "@/context/project.tsx";
import { useTaskCounts } from "../../hooks/useTaskCounts.ts";

type Props = {
  activatedTaskGroup: TaskGroup;
  taskList: Task[];
  onActivateTaskGroup: (taskGroup: TaskGroup) => void;
};

export default function Sidebar(props: Props) {
  const { activatedTaskGroup, taskList, onActivateTaskGroup } = props;
  const isActivated = (taskGroup: TaskGroup) => {
    return taskGroup.__type === activatedTaskGroup.__type;
  };

  // 添加project弹窗
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

  // 项目列表
  const [expanded, setExpanded] = useState(false);
  const { projectList, getProjectList } = useContext(ProjectListContext);
  const { taskCounts } = useTaskCounts(taskList, projectList);

  const ProjectItem = (props: {
    project: Project;
    taskCount: number;
    isActivated: boolean;
    onClickProject: () => void;
  }) => {
    const { project, taskCount, isActivated, onClickProject } = props;
    return (
      <div className={`project-item ${isActivated ? "activated" : ""}`} onClick={onClickProject}>
        <div className="icon-circle mr-10px" style={{ backgroundColor: project.color }}></div>
        {project.name}
        <span className="count">{taskCount || ""}</span>
      </div>
    );
  };

  return (
    <>
      <Layout.Sider className={styles["sidebar"]}>
        <div
          className={`task-group-item flex items-center ${isActivated(INBOX) ? "activated" : ""}`}
          onClick={() => onActivateTaskGroup(INBOX)}
        >
          <AntdInboxOutlined className="icon-inbox" />
          {TASK_GROUP_NAME_MAP.get(INBOX.name)}
          <span className="count">{taskCounts[INBOX.name] || ""}</span>
        </div>
        <div
          className={`task-group-item flex items-center ${isActivated(TODAY_FILTER) ? "activated" : ""}`}
          onClick={() => onActivateTaskGroup(TODAY_FILTER)}
        >
          <AntdCalendarOutlined className="icon-today" />
          {TASK_GROUP_NAME_MAP.get(TODAY_FILTER.name)}
          <span className="count">{taskCounts[TODAY_FILTER.name] || ""}</span>
        </div>
        <div
          className={`task-group-item flex items-center ${isActivated(RECENT_FILTER) ? "activated" : ""}`}
          onClick={() => onActivateTaskGroup(RECENT_FILTER)}
        >
          <AntdCalendarOutlined className="icon-today" />
          {TASK_GROUP_NAME_MAP.get(RECENT_FILTER.name)}
          <span className="count">{taskCounts[RECENT_FILTER.name] || ""}</span>
        </div>
        <div className={`project-group-toggle ${expanded ? "" : "expanded"}`}>
          <div className="flex items-center" onClick={() => setExpanded(!expanded)}>
            <AntdRightOutlined className="icon-arrow" />
            我的项目
          </div>
          <AntdPlusOutlined
            className="icon-add-project p-2px"
            onClick={() => setAddProjectModalOpen(true)}
          />
        </div>
        {expanded && (
          <div className="project-list">
            {projectList.map((project) => (
              <ProjectItem
                project={project}
                key={project.id}
                taskCount={taskCounts[project.name]}
                isActivated={project === activatedTaskGroup}
                onClickProject={() => onActivateTaskGroup(project)}
              />
            ))}
          </div>
        )}
      </Layout.Sider>
      <AddProjectModal
        open={addProjectModalOpen}
        setOpen={setAddProjectModalOpen}
        onAddedProject={getProjectList}
      />
    </>
  );
}
