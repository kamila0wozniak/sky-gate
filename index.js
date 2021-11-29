 async function customRedux() {

    const API_URL ='https://jsonplaceholder.typicode.com/users';

    const ACTIONS = {
        UPDATE_EMAIL:'UPDATE_EMAIL',
        UPDATE_NAME:'UPDATE_NAME'
    };

    const firstUser = await fetch(API_URL)
        .then(response => response.json())
        .then(data => data[0]);

    const initialState = {
        user: firstUser
    };

    function userReducer(action, state = initialState) {
        switch(action.type) {
            case ACTIONS.UPDATE_EMAIL:
                return {...state, user: {...state.user, ...action.payload}};
            case ACTIONS.UPDATE_NAME:
                return {...state, user: {...state.user, ...action.payload}};
            default:
                return {...state};
        }
    }

    function createStore(initState, reducer) {
        let state = initState;
        let listeners = [];

        const getState = () => {
            return state
        };

        const dispatch = (action) => {
            state = reducer(action, state);
            listeners.forEach(listener => listener(initState, state));

        };

        const subscribe = (listener) => {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter(l => l !== listener);
            };
        };

        dispatch({});

        return {getState, dispatch, subscribe};
    }

    const store = createStore(initialState, userReducer);

    store.dispatch({
        type: ACTIONS.UPDATE_EMAIL,
        payload: { email: "newEmail@test.com" }
    });

    store.dispatch({
        type: ACTIONS.UPDATE_NAME,
        payload: { name: "Antonio Benderas" }
    });

    store.subscribe((prevState, state) =>
        console.log("Listener 1 Email:", state.user.email)
    );
    store.subscribe((prevState, state) =>
        console.log("Listener 2 Name:", state.user.name)
    );

    store.dispatch({
        type: "UPDATE_NAME",
        payload: { name: "Leonardo Di Caprio" }
    });
}

customRedux();
