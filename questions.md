1) The difference between Component and PureComponent is that PureComponent won't re-render if 
    props and state hasn't been changed. It is basically a component that implements shouldComponentUpdate()
    with shallow comparison. If the props or state of PureComponent are deeply nested the shallow comparison might not detect changes and not render the component when needed.

2) I am not sure. Never used the two together, but maybe it has to do with shouldComponentUpdate not having nextContext
    unlike having nextState and nextProps.??

3) We can pass information from child to parent using redux, React context and forwardRef with useImperativeHandle.

4) Use React.memo or implement shouldComponentUpdate

5) Fragment is a way to group multiple elements into one without introducing a new div or other element.

6) Redux's connect function is a HOC, withRouter is a HOC from react router, or an example of custom HOC could be
    withWindowSize that adds windowWidth and windowHeight the the given component
    ```sh
    export const withWindowSize = <P extends WithWindowSizeProps>(Component: React.ComponentType<P>,): 
    React.FC<Omit<P, keyof WithWindowSizeProps>> => props => {
    const { width, height } = useWindowSize(); // a hook that returns windowHeight and width
    return <Component {...(props as P)} windowWidth={width} windowHeight={height} />;
  };
   ```


7) Callbacks have error first approach, meaning the callback function takes (err, data) =>  {} and the function will
    first check for an error and then will move on to the rest. The problem with callbacks is that you can easily end up in a
    callback hell if you have multiple nested callbacks. Promises use .then().catch() chain and async await uses try catch blocks

8) setState takes 2 arguments where the first one is an updater and the second argument is an optional callback function
    which gets executed after setState is completed. We can use the first argument in two ways
        1) `this.setState({val: newVal});`
        2) `this.setState((prevState, props) => ({val: prevState.val + 1}));` // this is used when new state depends on prevState
    setState is async so that react can batch multiple setState operations into one to improve performance

9) 1) Rename class declaration to be a function and pass props as argument
   2) Remove render method and leave the return
   3) If state is used replace by useState hook
   4) If lifecycle methods are used replaced by useEffect hook
   5) Get rid of all 'this'

10) Import .css file in your component file ||  In-line css in component || styled components

11) dangerouslySetInnerHTML() is a way to render an HTML string coming from the server, BUT as the name suggests
    it is dangerous because it exposes your app to XSS attacks. I have previously used sanitize-html package before
    passing the string to dangerouslySetInnerHTML function and had eslint-plugin-no-unsanitized plugin on.
