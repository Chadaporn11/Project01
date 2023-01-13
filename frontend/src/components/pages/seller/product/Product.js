import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

//card
import CardProductSeller from '../../../cards/CardProductSeller';
import CardProduct from '../../../cards/CardProduct';

//function
import {
  listProductByOwner,
} from '../../../functions/product';


//antd
import { Empty, Button, Form, Input, Spin, Image } from 'antd';

const initialstate = [{
  id: '',
  productName: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  productStatus: "",
  productImages: [],
},];


const Product = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialstate);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    let id = user.username;
    listProductByOwner(user.token, id)
      .then((res) => {
        // console.log('Data loaded=>', res.data);
        setProduct(res.data)
        setLoading(false);
        // setValue({
        //   id: res.data._id,
        //   productName: res.data.productName,
        //   description: res.data.description,
        //   category: res.data.category.name,
        //   price: res.data.price,
        //   productStatus: res.data.productStatus,
        //   productImages: res.data.productImages,
        // });
      }).catch((err) => {
        console.log(err.response.data);

      })
  }
  console.log('product=>', product)

  useEffect(() => {
    loadData()
  }, []);



  return (
    <div className="container max-w-[100%] max-h-auto bg-[#f9fafb] pb-[150px]">
      <div className="flex flex-col justify-items-center content-center w-[100%]">
        <div className='flex flex-col place-self-center h-[100px] mt-10'>
          {loading
            ? <h1 className='flex justify-center text-4xl'>Loading...<Spin /></h1>
            : <h1 className='flex justify-center text-4xl'>Product</h1>
          }
          {/* <h1 className='flex justify-center text-4xl'>Product</h1> */}
          <div className='flex justify-end w-[1200px]'>
            <Button
              type="primary"
              className="rounded-full bg-[#93c5fd] justify-self-center"
              onClick={() => navigate('/seller/create-product')}
              htmlType="submit"
            >
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className='grid grid-cols-4 gap-8'>
            {product.length === 0 && (
              <div className="col-span-4">
                <Empty
                  className=''
                />
              </div>
            )}
            {product.map((item, index) =>
              <div key={index} className='col-span-1'>
                <CardProductSeller
                  product={item}
                  loadData={loadData}
                  setLoading={setLoading}
                />
              </div>
            )}
            {/* 
            <div className='col-span-1'>
              <CardProductSeller />
            </div>
            <div className='col-span-1'>
              <CardProductSeller />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div> */}
            {/* <div className='col-span-1'>
              <CardProduct />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div> */}
          </div>
        </div>
      </div>

    </div>
    // <div className="container max-w-[100%] max-h-auto bg-[#f9fafb] pb-[150px]">
    //   <div className="grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[100%] h-auto">
    //     <div className='row-span-1 place-self-center'>
    //       <h1 className='flex justify-center text-3xl mt-3'>Product</h1>
    //       <div className='flex justify-end w-[1200px]'>
    //         <Button
    //           type="primary"
    //           className="rounded-full bg-[#93c5fd] justify-self-center"
    //           onClick={() => navigate('/seller/create-product')}
    //           htmlType="submit"
    //         >
    //           <i className="fa-solid fa-plus"></i>
    //         </Button>
    //       </div>
    //     </div>
    //     <div className="row-span-5 justify-center">
    //       <div className='grid grid-cols-4 gap-8'>
    //         {product.length === 0 && (
    //           <div className="col-span-4">
    //             <Empty
    //               className=''
    //             />
    //           </div>
    //         )}
    //         {product.map((item, index) =>
    //           <div key={index} className='col-span-1'>
    //             <CardProductSeller
    //               product={item}
    //               loadData={loadData}
    //             />
    //           </div>
    //         )}
    //         {/* 
    //         <div className='col-span-1'>
    //           <CardProductSeller />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProductSeller />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div> */}
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div>
    //         <div className='col-span-1'>
    //           <CardProduct />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </div>
  )
}

export default Product