import Vue from 'vue'
import Vuex from 'vuex'
import * as Actions from './mutation-types';

Vue.use(Vuex)

export const FILTER_STATUS = {
    ALL: "all",
    UNCOMPLETED: "uncompleted",
    COMPLETED: "completed",
};

export default new Vuex.Store({
    strict: true,
    state: {
        msg: "todo-list",
        newId: 3,
        filterKey: FILTER_STATUS.ALL,
        current: -1,
        todos: [
            {
                id: 1,
                title: "this is the first example, double click to edit it",
                completed: false,
                editing: false,
            },
            {
                id: 2,
                title: "this is the second example, double click to edit it",
                completed: false,
                editing: false,
            },
        ]
    },
    getters: {
        getCurrentId: (state) => {
            return state.current;
        },
        getTodosByFilterKey: (state) => {
            const isFitlerCompleted = state.filterKey === FILTER_STATUS.COMPLETED;
            return state.filterKey === FILTER_STATUS.ALL
                ? state.todos
                : state.todos.filter(todo => todo.completed === isFitlerCompleted);
        },
        getItemById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id);
        },
        isAllCompleted: (state) => {
            return state.todos.filter(todo => !todo.completed).length === 0;
        }
    },
    mutations: {
        [Actions.ADD_TODO]:
            (state, newTodo) => {
                state.todos.push({
                    id: state.newId,
                    title: newTodo,
                    completed: false,
                    editing: false
                });
                state.newId++;
            },
        [Actions.EDIT_TODO]:
            (state, id) => {
                state.current = id;
            },
        [Actions.DONE_EDIT]:
            (state, text) => {
                var id = state.current;
                var todo = state.todos.find(todo => todo.id === id);
                todo.title = text;
                state.current = -1;
            },
        [Actions.CANCEL_TODO]:
            (state) => {
                state.current = -1;
            },
        [Actions.DELETE_TODO]:
            (state, id) => {
                var stateTodo = state.todos.find(todo => todo.id === id);
                state.todos.splice(state.todos.indexOf(stateTodo), 1);
            },
        [Actions.CHANGE_FILTER_KEY]:
            (state, key) => {
                state.filterKey = key;
            },
        [Actions.CHANGE_COMPLETE_STATUS]:
            (state, id) => {
                var stateTodo = state.todos.find(todo => todo.id === id);
                stateTodo.completed = !stateTodo.completed;
            },
        [Actions.CLEAR_COMPLETED]:
            (state) => {
                state.todos = state.todos.filter(todo => !todo.completed);
            },
        [Actions.TOGGLE_ALL_ITEMS]:
            (state) => {
                var uncompletedItem = state.todos.filter(todo => !todo.completed);
                uncompletedItem.length > 0 ?
                    state.todos.map((todo) => { todo.completed = true })
                    :
                    state.todos.map((todo) => { todo.completed = false });
            }
    }
})