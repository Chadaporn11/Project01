import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';

//card
import CardProduct from '../cards/CardProduct';

//function
import { readProduct } from '../functions/product';

//antd
import { Empty, Button, Form, Input, Spin, Image } from 'antd';
import SingleProduct from '../cards/SingleProduct';

const initialstate = {
    id: '',
    productName: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    productStatus: "",
    productImages: [],
    owner: "",
};

const Product = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(initialstate);
    const [loading, setLoading] = useState(false);
    const [countImg, setCountImg] = useState(0);


    const loadData = () => {
        console.log('ID:', id)
        // setLoading(true);
        readProduct(id)
            .then((res) => {
                // console.log('Data loaded=>', res.data);
                console.log(res.data);
                setProduct(res.data)
                setLoading(false);
                setCountImg(res.data.productImages.length)
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
        <div className="container max-w-[100%] max-h-auto bg-[#f9fafb] pb-[140px]">
            <div className="flex flex-col justify-items-center content-center max-w-[100%] max-h-[680px]">
                <div className='flex flex-row place-self-center mt-20'>
                    {/* {loading
                        ? <h1 className='flex justify-center text-4xl'>Loading...<Spin /></h1>
                        : <h1 className='flex justify-center text-4xl'>Product</h1>
                    } */}
                    <SingleProduct product={product} countImg={countImg} />
                </div>
            </div>

        </div>
    )
}

export default Product