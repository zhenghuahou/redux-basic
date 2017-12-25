## react-redux
前面我们已经讲到了，redux实例来更新一组数据。[redux-basic 从Flux-redux](https://www.jianshu.com/p/0f5c018e16a5)

现在我们来继续优化之前的代码

###Context
在上面的代码，我们不难发现Counter和Summary组件文件中，都有直接导入Redux Store。

``` 
import store from '../Store.js'
```

这样在组件中直接导入Store是非常不利于组件复用的。

一个应用中，最好只有一个地方需要直接导入Store 。在文中的位置应该是ControlPanel。对应的是*src/index.js*

React提供一个叫Context功能。能够完美解决所有文件都使用store，不通过props一层一层的传递。

**所谓的Context，就是“上下文环境”。**让一个树状组件上所有组件都能访问一个共同的对象，为了完成这个任务，需要上级组件和下级组件的配合。
![React的Context]()

**那么如何来访问呢？**

* 首先上级组件要宣城自己支持context，并且提供一个函数来返回代表Context的对象。
* 然后，这个上级组件之下的所有子孙组件，只要宣称自己需要这个context，就可以通过this.context访问到这个共同的环境对象。

因此，我们来创建一个特殊React组件，它将是一个通用的context提供者，可以应用在任何一个应用中。我们把这个组件叫做Provider。

我们自己来实现一个Provider

```
import {PropTypes, Component} from 'react';

class Provider extends Component {

  //这个函数返回的就是代表Context的对象。
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }

}

Provider.propTypes = {
  store: PropTypes.object.isRequired
}

Provider.childContextTypes = {
  store: PropTypes.object
};

export default Provider;
```
在项目入口导入Provider

```

ReactDOM.render(
  <Provider store={store}>
    <ControlPanel />
  </Provider>,
  document.getElementById('root')
);
```
这样他的所有子孙组件都拥有了这个“全局的”store。

**那么子孙组件下，已知的store该如何更改呢？**

我们在构造函数中，增加参数，如下：

```
	 constructor(props, context) {
	 
    super(props, context);    //super(...arguments);
```
推荐使用   

```
 super(...arguments);
```

*之后将所有的**store** ，都替换为，**this.context.store***

至此，我们改进了React应用的两个方法。分别是

* 把一个组件拆分为容器组件和傻瓜组件（略）
* 第二是使用React的Context来提供一个所有组件都可以直接访问的Context

### 现在我们使用react-redux来实现这样的工作

#### react-redux的使用

```npm install --save react-redux```

#### react-redux的作用
> connect:连接容器组件和傻瓜组件
> 
> Provider：提供包含store的context。
> 

**connect**

代码里有这样的一个

```
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
乍一看，可能会有点蒙逼，其实，这是react-redux 提供的方法。第一次是connect函数的执行，第二次是把connect函数返回的函数再次执行，最后产生的就是容器组件。

至于connect函数具体做了什么工作呢？

* 把Store上的状态转化为内层傻瓜组件的prop
* 把内层傻瓜组件中的用户动作转化为派送给Store的动作。

这两个工作一个是内层傻瓜对象的输入，一个是内层傻瓜对象的输出。

我们细看 mapStateToProps 

```
function mapStateToProps(state, ownProps) {
  return {
    value: state[ownProps.caption]
  }
}
```

我们把内层傻瓜组件中国用户动作转化为派送给Store的动作，也就是把内层傻瓜组件暴露出来的函数类型的prop关联上dispatch函数的调用，每个prop代表的回调函数的主要区别就是dispatch函数的参数不同，这就是mapDispatchToProps

```
function mapDispatchToProps(dispatch, ownProps) {
  return {
    onIncrement: () => {
      dispatch(Actions.increment(ownProps.caption));
    },
    onDecrement: () => {
      dispatch(Actions.decrement(ownProps.caption));
    }
  }
}
```
通过名字我们也可以发现这两个函数的作用

[项目github 的地址-切换分支到’react-redux’分支上](https://github.com/krislee94/redux-basic/tree/react-redux)

###参考文献

程墨. 深入浅出React和Redux (实战)  北京华章图文信息有限公司