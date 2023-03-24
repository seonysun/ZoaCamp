import {useState, useEffect, Fragment} from "react";
import axios from "axios";

function Home(){
    const [campTop, setCampTop] = useState([])
    useEffect(()=>{
        axios.get('http://localhost/camping/camping_top6').then(response=>{
            console.log(response.data)
            setCampTop(response.data)
        })
    },[])

    let camp = campTop.map((camp, index)=>
            <li className={index%3==0?'one_third first':'one_third'} style={{"margin-bottom":"20px"}}>
                <figure><a className="imgover" href="#"><img src={camp.image} style={{"height":"250px"}} /></a>
                    <figcaption><strong>{camp.name}</strong> <em>{camp.address}</em></figcaption>
                </figure>
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
            <div class="bgded overlay light" style={{"background-image":"url('images/forest.jpg')"}}>
                <section id="services" className="hoc container clear">
                    <div className="sectiontitle">
                        <p className="nospace font-xs">캠핑조아에서 가장 인기있는 캠핑지 추천</p>
                        <h6 className="heading font-x2">인기 캠핑장</h6>
                    </div>
                    <ul className="nospace group team">
                        {camp}
                    </ul>
                </section>
            </div>
        </Fragment>
    )
}
export default Home;