import React from 'react';
import './menu-list-item.scss';
import ImageFirebase from "../imageFirebase/imgFirebase";
import WithRestoService from "../hoc";


// props menuItem
class MenuListItem extends React.Component {
    
    render() {
    
    const {category = "общая",price = 0, title = "блюдо", url} = this.props.menuItem;
     // WithRestoService добавляет еще один props RestoServiceProp
     const {RestoServiceProp} = this.props;
     const categoryUrl = 'url('+RestoServiceProp.categoryUrl[category]+')';
    //  console.log(categoryUrl);

    return (
            <li className="menu__item">
                <div className="menu__title">{title}</div>
                <ImageFirebase className="menu__img" imageName={url} imageTitle={title}></ImageFirebase>
                
                <div className="menu__FlexCont">
                    <div>
                        <div className="menu__category">Category: <span>{category}</span></div>
                        <div className="menu__price">Price: <span>{price}</span></div>
                    </div>
                    <div className="menu__categoryIcon" style={{backgroundImage : categoryUrl}}>

                    </div>
                </div>

                <button className="menu__btn">Add to cart</button>
            </li>
        
    )};
}

export default  WithRestoService(MenuListItem);