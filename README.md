###### 文中主分支是使用 redux  ，‘react-redux’分支是使用的‘redux 和 react-redux’



##从Flux到Redux
>单向数据流框架的始祖Flux
>
>Flux理念的一个更强实现Redux
>
>结合React和Redux
>

###认识Flux
flux框架贯彻的最重要的观点 - **单向数据流**

实际上Flux和React同时面世的。在2013年，Face-book公司让React亮相的同事，也推出了Flux框架。react和flux相辅相成。

做一个容易理解的对比，react是用来替代jquery的。那么flux就是替换backbone.js 、Ember.js等MVC框架为目的的。

*对于MVC框架，为了让数据流可控，Controller应该是中心，当view要传递消息给Model时，应该调用Controller的方法，同样，当Model要更新view时，也应该通过controller引发新的渲染。*

***

**Flux的不足**

* 1.Store之间依赖关系
* 2.难以进行服务器端渲染
* 3.Store混杂了逻辑和状态

###Redux的基本原则
Flux的基本原则是“单向数据流”、Redux在此基础上强调三个基本原则

* 唯一数据源
* 保持状态只读
* 数据改变只能通过纯函数完成

###逐一理解三条基本原则

####唯一数据源
唯一数据源指的是应用的状态数据应该只存储在唯一的一个Store上。从Flux来说，flux应用可以拥有多个Store、往往根据功能把应用的状态数据划分给诺干个Store分别存储管理。如果状态数据分散在多个Store中。容易造成数据冗余，这样数据一致性方面就会出现问题。

Redux对这个问题的解决方法就是，整个应用只保持一个Store、所有组件的数据源就是这个Store上的状态。

####保持状态只读
保持状态只读，就是说不能去直接修改状态（setState），要修改Store的状态，必须要通过派发一个action对象完成。

UI=render(state) .(这个react公式)

我们已经说过驱动用户界面更改的是状态，如果状态都是只读的不能修改，怎么可能引起用户界面的变化呢？

当然，要驱动用户界面渲染，就要改变应用的状态，但是改变状态的方法不是去修改状态上值。而是创建一个新的状态对象返回给Redux。由Redux完成新的状态的组装。

这就直接引出了下面的第三个基本原则。

####数据改变只能通过纯函数完成
这里所说的纯函数，就是Reducer，Redux名字的含义就是Reducer + Flux

Reducer不是一个Redux特定的术语，而是一个计算机科学中的通用概念，很多语言和框架都有对Reducer函数的支持。

我们以js为例。数据类型就有reduce函数，接受的参数就是一个reducer、reduce做的事情就是吧数组所有元素一次做“规约”，对每个元素都调用一次参数reducer、通过reducer函数完成规约所有元素的功能。

var array = [1,2,3,4]
function func(){
array.reduce(function reducer(acc,item){
console.log(acc+item);
return acc+item;
},0)
}
func();
上面的结果是 1 ，3， 6， 10

在Redux中，每个reducer的函数签名如下所示：

reducer(state,action)

第一个参数state是当前状态，第二个参数action是接受到的action对象。而reducer函数要做的事情，就是根据state 和 action的值产生一个新的对象返回，注意reducer必须是纯函数，也就是说函数的返回结果必须完全由参数state和action决定，而且不产生任何副作用，也不能修改参数state和action对象。

在redux中，一个实现reducer代码如下：

function reducer( state, action) => { 
const {counterCaption} = action; 
switch (action. type) { 
case ActionTypes. INCREMENT: 
return {...state, [counterCaption]: state[ counterCaption] + 1}; 
case ActionTypes. DECREMENT: 
return {...state, [counterCaption]: state[ counterCaption] - 1}; 
default: return state 
} 
}
可以看到reducer函数不光接受action为参数，还接受state未参数。也就是说，redux的reducer只负责计算状态，却并不负责存储状态。

*我们可以看src/Actions.js文件中*

export const increment = (counterCaption) => {
return {
type: ActionTypes.INCREMENT,
counterCaption: counterCaption
};
};

export const decrement = (counterCaption) => {
return {
type: ActionTypes.DECREMENT,
counterCaption: counterCaption
};
};

和Flux的src/Actions.js文件对比就会发现，Redux中每个action构造函数都返回一个action对象，而Flux版本中action构造函数，并不返回什么。而是把构造的动作函数立刻通过调用Dispatcher的dispatch函数派发出去

因为redux一般来说只有一个store。

import {createStore} from 'redux';
import reducer from './Reducer.js';

const initValues = {
'First': 0,
'Second': 10,
'Third': 20
};

const store = createStore(reducer, initValues);

export default store;

在这里，我们接触到了Redux库提供的createStore函数。
这里第一个参数代表 reducer，第二个参数是状态的初始值，第三个参数可选，代表Store Enhancer。

确定好store状态，是设计好Redux应用的关键。

**Redux的Store状态设计的一个主要原则：避免冗余**

*src/Reducer.js*

import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {
const {counterCaption} = action;

switch (action.type) {
case ActionTypes.INCREMENT:
return {...state, [counterCaption]: state[counterCaption] + 1};
case ActionTypes.DECREMENT:
return {...state, [counterCaption]: state[counterCaption] - 1};
default:
return state
}
}

这里 

return {...state, [counterCaption]: state[counterCaption] - 1};

其实，等同于下面的代码

const newState = Object.assign({},state);
newState[counterCaption]++;
return newState;
像上面这样写，创造了一个newState完全赋值了state、通过对newState的修改避免了对state的修改、不过这样写显得冗长、推荐使用扩展操作符，看起来更清晰简洁。

**在reducer中绝对不能直接操作state**

####在View中的应用

*接下来我们来看View部分*：

* 首先我来看Counter.js

在构造函数里，我们应该要注意

this.state = this.getOwnState();

而getOwnState()函数，是通过store.getState()这个API得来的。因此，在方法中。我们可以这样写

getOwnState() {
return {
value: store.getState()[this.props.caption]
};
}
在onChange函数中，我们不直接改变state，而是通过，改变，getOwnState()来改变响应的值。

onChange() {
this.setState(this.getOwnState());
}
在Counter中。我们可以看出ComponentDidMount中可以发现，subscribe监听其变化，只要Store的状态发生变化，就会调用这个组件的onChange的方法，在ComponentWillunmount中，我们可以将这个方法卸载掉。

componentDidMount() {
store.subscribe(this.onChange);
}

componentWillUnmount() {
store.unsubscribe(this.onChange);
}
至于加和减的方法，我们不难可以看到。在redux中，action只负责创建一个对象，要派发action就需要调用store.dispatch函数。

组件render函数所显示的内容，要么来自于props，要么来自于自身状态。
* 其次我们来看Summary.js

我们并没有状态来支持Summary组件，因为Summary组件的状态，完全可以通过把Counter状态数值加在一起得到，没有必须制造龙域数据存储。这也符合Redux唯一数据源的基本原则。

getOwnState(){
const state = store.getState();
let sum = 0;
for(let key in state){
if(state.hasOwnProperty(key)){
sum+=state[key]
}
}
return {sum : sum}
}
所以需要在getOwn-State状态中自己计算出所有计数值总和出来。

* 最后我们看ControlPanel.js

一个容器组件，装下Counter和Summary 就可以。
