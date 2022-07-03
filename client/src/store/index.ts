import { ref, computed } from "vue";
import { AppMessage, User } from "../core";

/**
 * Bundle and expose variables/functionalities 
 * to do with the managing of other users in the system
 */
function initUsers() {
    const users = ref<User[]>([]);
    const currentlySelectedUserId = ref("");
  
    function setUsers(list: User[]) {
      users.value = list;
    }
  
    function addUser(user: User) {
        users.value.push(user);
    }
  
    function setCurrentlySelectedUser(id: string) {
        currentlySelectedUserId.value = id;
    }
  
    const currentlySelectedUser = computed(() =>
      users.value.find((p) => p._id === currentlySelectedUserId.value)
    );
  
    return {
        setUsers,
        addUser,
        setCurrentlySelectedUser,
        currentlySelectedUser,
        currentlySelectedUserId,
        users,
    };
}

/**
 * Bundle and expose variables/functionalities 
 * to do with app-wide message management
 */
function initAppMessage() {
    const message = ref<AppMessage>({ type: "", message: "" });

    function setMessage(newMessage: AppMessage) {
        message.value = newMessage;
    }

    return {
        message,
        setMessage,
    };
}

/**
 * Bundle and expose variables/functionalities 
 * to do with the managing of the currently logged-in admin
 */
function initAdmin() {
    const admin = ref<User>();
  
    function setAdmin(user: User) {
        admin.value = user;
    }
  
    function unsetAdmin() {
        admin.value = undefined;
    }
  
    return {
        setAdmin,
        unsetAdmin,
        admin,
    };
}

const store = {
    ...initAdmin(),
    ...initUsers(),
    ...initAppMessage(),
};
  
export default store;