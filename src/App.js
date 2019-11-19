import React,{useEffect,useReducer,useState} from 'react';
import axios from 'axios'
import { message, Button,Spin,Icon,Card,Divider,Tag } from 'antd';
import 'antd/dist/antd.css'
const { Meta } = Card;
const App = ()=>{
  let defaultData  = {city:'武汉',id:0}//初始化仓库数据
  const [weather,setWeather] = useState({})//接口拿到的数据
  const [loading,setLoading] = useState(false)//loading
  const [loading2, setLoading2] = useState(false) //骨架屏
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
  const [state, dispatch] = useReducer(reducer, defaultData);
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
  //检测id发生改变
  useEffect(() => {
     //首屏加载不执行
     if (state.id===0)return;
     setLoading(true)
     setTimeout(() => {
       setLoading(false); 
       message.warning(`ID发生改变，改变后的值为${state.id}`);
      },1000);
   }, [state.id])
   //检测State发生变化
  useEffect(() => {
     //首屏加载不执行
    if (state.id === 0) return;
    setTimeout(() => {
      message.error(`State发生变化`);
    }, 2000);
  }, [state])
   //useReducer 映射函数
  const mapDispatch = dispatch => ({
    city: () => dispatch({ type: 'city'}),
    id: () => dispatch({ type:'id' }),
  })
  //触发器dispatch注册到映射函数
  const actions = mapDispatch(dispatch)
  return (
    <>
        <Spin 
        indicator={<Icon type="smile" theme="twoTone" style={{ fontSize: 300,marginLeft:'-150px' }} spin />} 
        spinning={loading} >
          <Card style={{ width: 400, margin:'100px auto 10px auto' }} loading={loading2}>
          <Meta
            title={state.city+'今天天气☁️'} 
          />
           <p></p>
            实时<Tag color="magenta">{weather.dat_condition}</Tag>,
            空气污染<Tag color="green">{weather.quality_level}</Tag>,
            温度<Tag color="volcano">{weather.dat_low_temperature}℃～{weather.dat_high_temperature}℃</Tag>,
            预计明天<Tag color="purple">{weather.tomorrow_condition}</Tag>。
        </Card>

        <p style={{textAlign:'center'}}>
            <Button 
            style={{textAlign:'center'}} 
            onClick={actions.city}> 
            获取{state.city==='武汉'?'杭州':'武汉'}的天气🐶 
            </Button>      
        </p>
          <Divider dashed>I'm 分割线🤒️</Divider>
        
        <h2 style={{textAlign:'center'}}>
          <Tag style={{ fontSize: '50px',lineHeight:'50px' }} color="magenta">ID:{state.id}</Tag>
        </h2>        
        <p style={{textAlign:'center'}}>
            <Button 
            style={{textAlign:'center'}} 
            onClick={actions.id}>ID自增+
            </Button>      
        </p>
        </Spin>
    </>
  )
}

export default App;
