import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal';
import Layout from '../../components/layout';
import { Col, Container, Row } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import linearCategories from '../../helpers/linearCategories';
import { useSelector } from 'react-redux';

const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState("");
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);
    const onCategoryChange = (e) => {
        const category = categories.find(category => category._id == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
        //renderCreatePageModal(false);
    }
    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    };
    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]])
    };
    const submitPageForm = (e) => {
        //e.target.preventDefault();

        if (title === "") {
            alert("Title is required");
            setCreateModal(false);
            return;
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        console.log({ title, desc, categoryId, type, banners, products });
    }
    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'create New Page'}
                handleClose={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className='form-control form-control-sm'
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Description'}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    {
                        banners.length > 0 ?
                            banners.map((banner, index) =>
                                <Row>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control"
                                type='file'
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    {
                        products.length > 0 ?
                            products.map((product, index) =>
                                <Row>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control"
                                type='file'
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal>
        );
    }
    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
        </Layout>
    )
}

export default NewPage;
