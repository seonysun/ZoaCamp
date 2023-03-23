import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
/*
작동 순서
    1. 메모리 할당
    2. componentWillMount : mount(가상메모리=돔)
    3. componentDidMount
    4. render : 화면 출력
    5. componentWillUpdate
    6. componentDidUpdate : setXxx
    7. componentWillDestroy
    8. componentDidDestroy

변수
 1. 변수 종류
    - props : 호출 시 전송(불변)
    - state : 변경 가능한 데이터
 2. 변수 설정
    - class : 멤버변수 설정 가능
    - function : 지역변수 설정 -> 계속해서 유지되는 변수는 useState 설정 => Hooks
* */
function Header(props){
    return(
        <div className="wrapper row1">
            <header id="header" className="hoc clear">
                <div id="logo" className="fl_left">
                    <h1 className="logoname"><NavLink to={"/"}>제주맛집<span>/</span>서울여행</NavLink></h1>
                </div>
                <nav id="mainav" className="fl_right">
                    <ul className="clear">
                        <li className="active"><NavLink to={"/"}>Home</NavLink></li>
                        <li><a className="drop" href="#">제주</a>
                            <ul>
                                <li><NavLink to={"/jeju/food_list"}>맛집</NavLink></li>
                                <li><NavLink to={"/jeju/event_list"}>행사&이벤트</NavLink></li>
                            </ul>
                        </li>
                        <li><a className="drop" href="#">서울여행</a>
                            <ul>
                                <li><NavLink to={"/"}>명소</NavLink></li>
                                <li><NavLink to={"/"}>자연&관광</NavLink></li>
                                <li><NavLink to={"/"}>쇼핑</NavLink></li>
                            </ul>
                        </li>
                        <li><a className="drop" href="#">레시피</a>
                            <ul>
                                <li><NavLink to={"/recipe/list"}>레시피</NavLink></li>
                                <li><NavLink to={"/"}>쉐프</NavLink></li>
                            </ul>
                        </li>
                        <li><NavLink to={"/"}>커뮤니티</NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}
export default Header;