import { Layout } from "antd";
import styles from "./sidebar.module.scss";
import { INBOX, TODAY_FILTER, RECENT_FILTER, TASK_GROUP_NAME_MAP } from "@/constants/TASK_GROUP.ts";
import AddProjectModal from "../AddProjectModal/AddProjectModal.tsx";
import { UserContext } from "@/context/user.tsx";
import { getProjectDoc } from "@/api/projects/project.ts";

type Props = {
  activatedTaskGroup: TaskGroup;
  onActivateTaskGroup: (taskGroup: TaskGroup) => void;
};

export default function Sidebar(props: Props) {
  const { user } = useContext(UserContext);

  const { activatedTaskGroup, onActivateTaskGroup } = props;
  const isMounted = useRef(false);
  const isActivated = (taskGroup: TaskGroup) => {
    return taskGroup.__type === activatedTaskGroup.__type;
  };

  // 添加project弹窗
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

  // 项目列表
  const [expanded, setExpanded] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const getProjectList = async () => {
    try {
      const projectList: Project[] = await getProjectDoc({ userId: user!.uid });
      isMounted.current && setProjectList(projectList);
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    isMounted.current = true;
    getProjectList();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const ProjectItem = (props: { project: Project }) => {
    const { project } = props;
    return (
      <div className="project-item">
        <div className="icon-circle mr-10px" style={{ backgroundColor: project.color }}></div>
        {project.name}
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
        </div>
        <div
          className={`task-group-item flex items-center ${isActivated(TODAY_FILTER) ? "activated" : ""}`}
          onClick={() => onActivateTaskGroup(TODAY_FILTER)}
        >
          <AntdCalendarOutlined className="icon-today" />
          {TASK_GROUP_NAME_MAP.get(TODAY_FILTER.name)}
        </div>
        <div
          className={`task-group-item flex items-center ${isActivated(RECENT_FILTER) ? "activated" : ""}`}
          onClick={() => onActivateTaskGroup(RECENT_FILTER)}
        >
          <AntdCalendarOutlined className="icon-today" />
          {TASK_GROUP_NAME_MAP.get(RECENT_FILTER.name)}
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
              <ProjectItem project={project} key={project.id} />
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
