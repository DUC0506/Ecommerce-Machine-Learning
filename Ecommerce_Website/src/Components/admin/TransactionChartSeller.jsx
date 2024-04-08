import React, { useEffect, useState } from 'react'
import { getSalePredictionItem } from '../../api/chart';
import SalesChart from './shared/SaleChart';
import { useNotification } from '../../hooks';

export default function TransactionChartSeller() {
    const [formData ,setFormData] =useState({
		start_date:"",
		end_date:" ",
		holidays:" "
	})
	const [dataPre,setDataPre]=useState([])
    const [loading, setLoading]=useState(false)
	const {updateNotification}=useNotification()
	const [holidayData,setHolidayData] = useState([])

	function generateLabels(length) {
		return Array.from({ length }, (_, index) => `Week ${index + 1}`);
	}
	function formatDate(dateString) {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lưu ý: Tháng bắt đầu từ 0
		const year = date.getFullYear();
	
		return `${day}-${month}-${year}`;
	}
		

	const labels = generateLabels(dataPre.length);
    const data = dataPre;

	const handleHolidays=()=>{
		setHolidayData([...holidayData,formatDate(formData.holidays)])
	}
	const handleChange=(e)=>{
		const {name , value}=e.target
		setFormData((prevData)=>({
			...prevData,
			[name]: value
		}))
	}
	const handleSummit=async()=>{
		const formattedFormData = {
            start_date: formatDate(formData.start_date),
            end_date: formatDate(formData.end_date),
         
        };
		if(formattedFormData.start_date==="NaN-NaN-NaN" || formattedFormData.end_date==="NaN-NaN-NaN"){
			
			return updateNotification('error','	Thiếu ngày dự đoán !')
			
		}
		console.log(formattedFormData);
        setLoading(true);
        setTimeout(async()=>{
		    const {predictions}= await getSalePredictionItem(formattedFormData,4)
            console.log(predictions);
			if(!predictions){
				setLoading(false);
				return updateNotification('error','Dự đoán thất bại')
				
			}
			updateNotification('success','Dự đoán thành công')
            setDataPre(predictions)
             setLoading(false);
        },12000);
       

	}
	useEffect(()=>{

	},[])

    return (
		<div className='flex w-full '>
        	<SalesChart labels={labels} data={data}/>
			<div className='flex flex-col justify-center items-center ml-4 mt-4 bg-slate-50 p-4 rounded'>
				<div className='flex items-center'>
					
					<input type="date" className='mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500' name='start_date' onChange={handleChange} value={formData.startDay} />
					<div className='text-lg font-sans font-medium mr-1'>-</div>
					<input type="date" className='mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500'  name='end_date'  onChange={handleChange} value={formData.endDay}  />

				</div>
				
				
			
      		
				<div  className='flex mb-2 mt-2'>
					<input type="date"  className='mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500'  name='holidays'  onChange={handleChange} value={formData.holiday}  />
					<button className='bg-yellow-400 py-2 px-4 rounded ml-2 font-sans font-medium ' onClick={()=>handleHolidays()}> Thêm ngày lễ</button>
				</div>
				<textarea name="arrayHoliday" id="arrayHoliday" className='font-sans w-full font-normal text-lg p-2 rounded mb-2 outline-none active:outline-yellow-500 hover:outline-yellow-500'  value={holidayData}></textarea>
				<button className='bg-yellow-400 py-2 px-4 w-1/2 rounded hover:bg-yellow-500  font-sans font-medium' onClick={()=>handleSummit()}>{loading ? 'Đang xử lý':'Dự đoán '} </button>
			</div>
		</div>
    );
}
