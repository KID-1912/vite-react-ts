import mitt from "mitt";

type Events = {
  "addTaskModal:addTaskSuccess": { newTask: NewTask; taskGroup: TaskGroup };
};

const emitter = mitt<Events>();
export default emitter;
