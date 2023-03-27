import {useEffect, useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
/* global kakao */

function CampDetail(props){
    let {cno} = useParams()

    const [campDetail, setCampDetail] = useState({})
    const [itemList, setItemList] = useState([])

    useEffect(()=>{
        axios.get('http://localhost/camping/camping_detail_react',{
            params:{
                cno:cno
            }
        }).then(response=>{
            console.log(response.data)
            setCampDetail(response.data)
        })
    },{})
    useEffect(()=>{
        axios.get('http://localhost/item/item_list_react').then(response=>{
            console.log(response.data)
            setItemList(response.data)
        })
    },[])

    let html=itemList.map((item)=>
        <li className="one_third">
            <article><a href="#"><img src={item.image} style={{"width":"100%"}}/> </a>
                <h6 className="heading">{item.name}</h6>
            </article>
        </li>
    )

    //쿠키 생성
    document.cookie = "camp"+parseInt(cno)+"="+campDetail.image;

    //카카오맵
    useEffect(()=>{
        const script = document.createElement("script")
        script.async = true
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e7b9d67490320db6911ad3cb1c1e9e18&libraries=services"
        document.head.appendChild(script)
        script.onload =()=> {

            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };

            // 지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption);

            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(campDetail.address, function (result, status) {

                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {

                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: '<div style={{"width":"150px","text-align":"center","padding":"6px 0"}}">'+campDetail.name+'</div>'
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });

        }
    })

    return(
        <div className={"wrapper row3"}>
            <main className={"hoc container clear"}>
                <div className="sectiontitle">
                    <h4 className="heading font-x2">{campDetail.name}</h4>
                </div>
                <div className={"content"}>
                    <div className={"one_half first"}>
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <td>
                                    <img src={campDetail.image} style={{"height":"400px"}}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={"one_half"}>
                        <table className={"table"} style={{"font-size":"18px"}}>
                            <tbody>
                            <tr style={{"height":"50px"}}>
                                <th width={"20%"}>주소</th>
                                <td width={"50%"}>{campDetail.address}</td>
                            </tr>
                            <tr style={{"height":"50px"}}>
                                <th width={"20%"}>전화</th>
                                <td width={"50%"}>{campDetail.tel}</td>
                            </tr>
                            <tr style={{"height":"50px"}}>
                                <th width={"20%"}>테마</th>
                                <td width={"50%"}>{campDetail.camp_env}</td>
                            </tr>
                            <tr style={{"height":"50px"}}>
                                <th width={"20%"}>타입</th>
                                <td width={"50%"}>{campDetail.camp_type}</td>
                            </tr>
                            <tr style={{"height":"50px"}}>
                                <th width={"20%"}>주소</th>
                                <td width={"50%"}>{campDetail.homepage}</td>
                            </tr>
                            <tr style={{"height":"50px"}}>
                                <th width={"20%"}>영업일</th>
                                <td width={"50%"}>{campDetail.day}</td>
                            </tr>
                            <tr style={{"height":"110px"}}>
                                <td colSpan={"2"}>{campDetail.name}으로 놀러오세요!</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{"height":"50px"}}></div>
                <div className={"content"}>
                    <div id="map" style={{"width":"100%","height":"400px"}}></div>
                </div>
                <div style={{"height":"50px"}}></div>
                <div className="sectiontitle">
                    <h6 className="heading font-x2">추천 상품</h6>
                </div>
                <div className={"content"}>
                    <ul className="nospace group elements elements-three">
                        {html}
                    </ul>
                </div>
            </main>
        </div>
    )
}
export default CampDetail;