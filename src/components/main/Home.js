import {useState, useEffect, Fragment} from "react";
import axios from "axios";

function Home(){
    const [foodTop, setFoodTop] = useState([])
    useEffect(()=>{
        axios.get('http://localhost/jeju/food_top6').then(response=>{
            console.log(response.data)
            setFoodTop(response.data)
        })
    },[])

    let html = foodTop.map((food)=>
        <li className="one_third">
            <article><a href="#"><img src={food.poster} style={{"width":"100%"}} /></a>
                <h6 className="heading">{food.title}</h6>
                <p>{food.addr}</p>
            </article>
        </li>
    )

    return(
        <Fragment>
            <div className="bgded overlay" style={{"background-image":"url('images/camp2.jpg')"}}>
                <div id="pageintro" className="hoc clear">
                    <article>
                        <h3 className="heading">Zoa Camping</h3>
                        <p>일상에서 벗어나 캠핑을 떠나보세요!</p>
                        <footer><a className="btn" href="#">캠핑장 찾기</a></footer>
                    </article>
                </div>
            </div>
            <div className="wrapper row3">
                <main className="hoc container clear">
                    <section id="introblocks">
                        <ul className="nospace group btmspace-80 elements elements-four">
                            <li className="one_quarter">
                                <article><a href="#"><i className="fas fa-hand-rock"></i></a>
                                    <h6 className="heading">오늘의 날씨</h6>
                                </article>
                            </li>
                            <li className="one_quarter">
                                <article><a href="#"><i className="fas fa-dove"></i></a>
                                    <h6 className="heading">오늘의 뉴스</h6>
                                </article>
                            </li>
                            <li className="one_quarter">
                                <article><a href="#"><i className="fas fa-history"></i></a>
                                    <h6 className="heading">추천 여행지</h6>
                                </article>
                            </li>
                            <li className="one_quarter">
                                <article><a href="#"><i className="fas fa-heartbeat"></i></a>
                                    <h6 className="heading">추천 맛집</h6>
                                </article>
                            </li>
                        </ul>
                    </section>
                    <div className="clear"></div>
                </main>
            </div>
            <div class="bgded overlay light" style={{"background-image":"url('images/camp3.jpg')"}}>
            <section id="services" class="hoc container clear">
                <ul class="nospace group elements elements-three">
                    {html}
                </ul>
            </section>
            </div>
        </Fragment>
    )
}
export default Home;