import React, { Component, Fragment } from 'react';
import axios from 'axios';



class RequestHandler extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            imageURL: ""
        };

    }


    addCategory = (event) => {
        let categoryName = this.state.name;
        let categoryDescription = this.state.description;
        let categoryImage = this.state.imageURL;

        let newCategory = { "name": categoryName, "description": categoryDescription, "image": categoryImage };
        const apiEndpoint = 'https://simplor.herokuapp.com/api/category/create';

        if (categoryName || categoryDescription || categoryImage) {
            axios({
                method: "POST",
                url: apiEndpoint,
                data: newCategory
            })
                .then(res => console.log(res.data))
                .catch(err => console.error(err))

            alert(`Category has been created`);
            event.preventDefault();
        } else {
            alert(`Fill the text fields`);
            event.preventDefault();
        }

    }





    showOutput = (res) => {
        document.getElementById('root2').innerHTML = `
        <div class="card card-body mb-4">
            <div>
            <h5>Status: ${res.status}</h5>
            </div>
        
            <div class="card mt-3">
                <div class="card-header">
                    Data
                </div>
                <div class="card-body">
                    <pre>${JSON.stringify(res.data, null, 2)}</pre>
                </div>
            </div>
    
        </div>
    `;
    }

    allCategories = (event) => {

        const apiEndpoint = 'https://simplor.herokuapp.com/api/category/categories';
        axios({
            method: 'GET',
            url: apiEndpoint
        })
            .then(res => { this.showOutput(res) })
            .catch(err => console.error(err))

    }

    editCategory = (event) => {

        let categoryName = this.state.name;
        let categoryDescription = this.state.description;
        let categoryImage = this.state.imageURL;

        if (categoryName || categoryDescription || categoryImage) {

            let updatedCategory = { "name": categoryName, "description": categoryDescription, "image": categoryImage };
            const id = prompt('Please enter the id of the category you want to edit');
            const apiEndpoint = `https://simplor.herokuapp.com/api/category/update/${id}`;

            if (id) {
                axios({
                    method: 'PUT',
                    url: apiEndpoint,
                    data: updatedCategory
                })
                    .then(res => console.log(res.data))
                    .catch(err => console.error(err))
            } else {
                alert('Please input an id which exists')
            }
        } else {
            alert('Fill the the text fields with the updates');
            event.preventDefault();
        }


    }

    deleteCategory = (event) => {

        const id = prompt('Please enter the id of the category you want to delete');

        if (id) {
            const apiEndpoint = `https://simplor.herokuapp.com/api/category/delete/${id}`;
            axios({
                method: 'DELETE',
                url: apiEndpoint
            })
                .then(res => console.log(res.data))
                .catch(err => console.error(err))

        } else {
            alert('Please input an id which exists')
        }

    }




    render() {
        return (
            <Fragment>
                <div>
                    <h1 className="font-bold text-center text-3xl text-blue-900 pb-5 pt-3">CRUD app</h1>
                    <form className="grid place-items-center mb-6" onSubmit={this.addCategory}>
                        <div>
                            <div className="my-3">
                                <input
                                    placeholder="name"
                                    size="60"
                                    className="border py-2 px-3 text-grey-darkest"
                                    value={this.state.name}
                                    onChange={(inputValue) => { this.setState({ name: inputValue.target.value }) }}
                                />
                            </div>

                            <div className="my-3">
                                <input
                                    placeholder="description"
                                    size="60"
                                    className="border py-2 px-3 text-grey-darkest"
                                    value={this.state.description}
                                    onChange={(inputValue) => { this.setState({ description: inputValue.target.value }) }}
                                />
                            </div>

                            <div className="my-3">
                                <input
                                    placeholder="image"
                                    size="60"
                                    className="border py-2 px-3 text-grey-darkest"
                                    value={this.state.imageURL}
                                    onChange={(inputValue) => { this.setState({ imageURL: inputValue.target.value }) }}
                                />
                            </div>
                        </div>
                    </form>

                </div>



                <div className="grid place-items-center mt-5">
                    <div className="mb-3 px-3">
                        <button className="bg-green-400 mx-3 py-2 px-5 rounded hover:bg-green-800 hover:text-white " onClick={this.addCategory} type="submit">create</button>

                        <button className="bg-blue-400 mx-3 py-2 px-5 rounded hover:bg-blue-800 hover:text-white " onClick={this.allCategories}>list</button>

                        <button className="bg-yellow-400 mx-3 py-2 px-5 rounded hover:bg-yellow-700 hover:text-white " onClick={this.editCategory}>update</button>

                        <button className="bg-red-400 mx-3 py-2 px-5 rounded hover:bg-red-800 hover:text-white " onClick={this.deleteCategory}>delete</button>
                    </div>
                </div>
            </Fragment>

        )

    }
}

export default RequestHandler;