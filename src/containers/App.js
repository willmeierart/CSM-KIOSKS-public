import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {RouteTransition} from 'react-router-transition'
import {spring} from 'react-motion'
import {binder} from '../utils'
import {selectVideo, fetchCSMdata, selectKioskSet, selectCategory, fetchVimeoMP4} from '../actions'
import '../styles/fonts/fonts.css'
import '../styles/main.css'
import '../styles/ui-animation.css'
import AdminMenu from '../components/Structure/AdminMenu'
import FrontPage from '../components/Structure/FrontPage'
import CategoriesPage from '../components/Interface/CategoriesPage'
import FullScreenPlayer from './FullScreenPlayer'
import NavWrapper from '../components/Structure/NavWrapper'

class App extends Component {
  constructor(props){
    super(props)
    if(!this.props.data.CSMdata[0]){this.props.onFetchCSMdata()}
    const {CSMdata} = this.props.data
    let freshy = []
    async function fresh(){freshy = await fetchCSMdata().payload}
    fresh().then(()=>{
      if(CSMdata[0]!==freshy.data[0]){this.props.onFetchCSMdata()}
    })
    this.state = {showIndex:false, showHeader:true}
    binder(this,['showNav', 'hideNav', 'showHeader', 'hideHeader', 'toggleNav'])
  }
  componentWillMount(){
    const data = this.props.data.CSMdata
    const {selections} = this.props.data
    const initSet = selections.set
    if (initSet.set){
      const newSet = data.find(one=>one.set.title===initSet.set.title)
      if(initSet!==newSet){this.props.onSelectKioskSet(newSet)}
    } else {this.props.onSelectKioskSet(data[0])}
  }
  toggleNav(){this.setState({showIndex:this.state.showIndex?false:true})}
  showNav(){this.setState({showIndex:true})}
  hideNav(){this.setState({showIndex:false})}
  showHeader(){this.setState({showHeader:true})}
  hideHeader(){this.setState({showHeader:false})}

  render() {
    const data = this.props.data.CSMdata
    const adminSetList = data.map((set,i)=>{
      return {title:set.set.title,index:i}
    })
    const {selections} = this.props.data
    const {set}=selections.set
    const {category} = selections.category
    return (
      <div className="App">
        <BrowserRouter history={this.history} basename="/kiosk">
        <div>
          <NavWrapper
            onShowHeader={this.showHeader}
            showHeader={this.state.showHeader}
            showIndex={this.state.showIndex}
            set={set}
            hideNav={this.hideNav}
            toggleNav={this.toggleNav}
            history={this.history}
            onSelectVideo={this.props.onSelectVideo}
            onSelectCategory={this.props.onSelectCategory}/>
          <main>
          <Route render={({location,history,match})=>{return(
            <div><Route path="/videos" render={()=>{return(
              <FullScreenPlayer set={set}
                selections={selections}
                category={category} navOpen={this.state.showIndex}
                showHeader={this.showHeader} hideHeader={this.hideHeader}
                video={this.props.data.selections.video}
                />)}}/>
              <RouteTransition
                  style={{position:'absolute', bottom:0, left:0, width:'100vw',height:'calc(100vh - 2.6041666667vw)'}}
                  pathname={location.pathname}
                  atEnter={{ opacity: 0, translateY:40, translateZ:0}}
                  atLeave={{ opacity: spring(0,{stiffness:300,damping:40}), translateY:spring(-40,{stiffness:300,damping:40}), translateZ:0}}
                  atActive={{ opacity: spring(1,{stiffness:300,damping:40}), translateY:spring(0,{stiffness:300,damping:40}), translateZ:0}}
                  mapStyles={styles=>({opacity:styles.opacity, transform:`translateY(${styles.translateY}px) translateZ(${styles.translateZ})`})}>
                <Switch key={location.pathname} location={location}>
                  <Route path="/categories" render={()=>{return (
                    <CategoriesPage set={set} category={category}
                      onSelectCategory={this.props.onSelectCategory}
                    />)}}/>
                  <Route path="/admin" render={()=>{return(
                    <AdminMenu data={this.props.data.CSMdata}
                      showHeader={this.showHeader}
                      adminSetList={adminSetList}
                      onSelectKioskSet={this.props.onSelectKioskSet}
                    />)}}/>
                  <Route exact path="/" render={()=>{return (
                    <FrontPage set={set}
                      showHeader={this.showHeader}
                      onSelectCategory= {this.props.onSelectCategory}
                    />)}}/>
                </Switch>

              </RouteTransition>
              {/*<ReactCSSTransitionGroup
                  component="div"
                  transitionName="bg-fade"
                  transitionEnterTimeout={660}
                  transitionLeaveTimeout={660}
                  transitionAppearTimeout={660}
                  transitionAppear={true}>
                {location.pathname=='/'&&
                  <div style={{position:'absolute', width:'100vw', height:'150vh', backgroundColor:'black', zIndex:'-1'}}/>}
              </ReactCSSTransitionGroup>*/}
            </div>
          )}}/>
        </main>
        </div>
      </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{return {data:state}}
const mapDispatchToProps=dispatch=>{return{
  onSelectVideo:vid=>{dispatch(selectVideo(vid))},
  onSelectCategory:cat=>{dispatch(selectCategory(cat))},
  onSelectKioskSet:set=>{dispatch(selectKioskSet(set))},
  onFetchCSMdata:()=>{dispatch(fetchCSMdata())},
  onFetchVimeoMP4:id=>{dispatch(fetchVimeoMP4(id))}
}}

export default connect(mapStateToProps, mapDispatchToProps)(App)
