import { ref, computed } from "vue";

function initUsers() {
    const projects = ref<User[]>([]);
    const currentProjectId = ref("");
    const message = ref<Message>({ type: "", message: "" });
  
    function setProjects(list: Project[]) {
      projects.value = list;
    }
  
    function addProject(project: Project) {
      projects.value.push(project);
    }
  
    function setCurrentProject(id: string) {
      currentProjectId.value = id;
    }
  
    const currentProject = computed(() =>
      projects.value.find((p) => p._id === currentProjectId.value)
    );
  
    function setMessage(newMessage: Message) {
      message.value = newMessage;
    }
  
    return {
      setProjects,
      addProject,
      setCurrentProject,
      setMessage,
      currentProject,
      currentProjectId,
      projects,
      message,
    };
}

const store = {
    ...initUsers()
};
  
export default store;