> 众所周知  `Redux`  是 `React` 的状态管理，但是操作太过繁琐，自从`Hooks` 问世之后，我们大可以使用新Api  `useReduce`  来进行状态管理。

### 定义我们初始状态

```js
 let defaultData  = {city:'武汉',id:0}//初始化仓库数据
```

### 新建一个Reduce函数

```js
  //Redux for Hooks
  const reducer = (state, action) => {
    switch (action.type) {
      case 'city':
        return {...state,city:state.city==='武汉'?'杭州':'武汉'};
      case 'id':
        return {...state,id:state.id+1};
        default:
          throw new Error();
    }
  }
```

### 两者关联起来

```js
  const [state, dispatch] = useReducer(reducer, defaultData);
```

## 下面的步骤为实际开发中便于管理 可不这样写

### 定义映射函数

```js
   //useReducer 映射函数
  const mapDispatch = dispatch => ({
    city: () => dispatch({ type: 'city'}),
    id: () => dispatch({ type:'id' }),
  })
```

### 配发器注入到映射函数

```js
  const actions = mapDispatch(dispatch)
```

这样，如果我们想让城市发生改变 

```html
<Button 
 onClick={actions.city}> 
  获取{state.city==='武汉'?'杭州':'武汉'}的天气🐶 
</Button>    
```

就结束了 

想让id自增

```html
<Button 
onClick={actions.id}>ID自增+
</Button>   
```

----------

是不是方便多了

如果我们想城市一发生改变后去拿改变后城市的天气情况☁️ 我们需要使用`useEffect`

```js
  //检测city发生改变
 useEffect(() => {
   setLoading2(true)
   const getWeather = async ()=>{
        const result = 
        await axios(`https://api.xiaohuwei.cn/weather.php?city=${state.city}`)
        setWeather(result.data)
        setTimeout(() => {
          setLoading2(false);
          message.success(`${state.city}天气更新成功`);
        }, 1500);
   }
   getWeather();
 }, [state.city])
```

可以看到 `useEffect`  第二个参数这里写的是 `[state.city]`  就是代表这个函数监听的就是城市改变然后执行相应的逻辑。如果你想要监听id的变化，那就只需要再申明一个 `useEffect`   即可，聪明的你肯定会知道第二个参数为 `[state.id]`。

--------

最后附上完整代码 [Reactproject](https://github.com/xiaohuwei/Reactproject)

看一下Demo？  [Demo](https://web.testdiv.com/)

