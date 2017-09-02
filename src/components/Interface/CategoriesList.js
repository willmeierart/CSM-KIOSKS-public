import React, {Component} from 'react'
import ListModule from './CategoriesListModule'

export default class CategoriesList extends Component{
  handleClick(i){
    this.props.onSelectCategory(this.props.set.categories[i])
    this.props.resetRange()
  }
  renderCondition(id, category, url){
    return(
      <ListModule key={`second${id}`}
        id={id}
        className="module"
        category={this.props.category}
        title={category}
        urlSnippet={url}
        handleClick={()=>{this.handleClick(id)}
    }/>)
  }
  render(){
    const linkList = this.props.set.categories.filter(each=>{
      return each.category.visibility!=='hidden'})
      .map((each, id)=>{const url_snippet = each.category.title.toLowerCase().split(' ').join('-')
      return this.renderCondition(id, each.category.title, url_snippet)
    })
    return (
      <div style={{width:'100%', height:'100%', position:'relative'}}>
        {linkList}
      </div>
    )
  }
}
