import {useEffect, useState} from "react";
import {useParams} from "react-router";

function EventDetail(props){
    let {no} = useParams()
    return(
        <h1>이벤트 번호 : {no}</h1>
    )
}
export default EventDetail;