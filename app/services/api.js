export const LoginService = async (email, password) => {
    // console.log('/user/login', email, password);
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json()
}
export const SignupService = async (email, password,name) => {
    // console.log('/user/login', email, password);
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password ,name}),
    });
    return response.json()
}
export const GetProducts = async () => {
    // console.log('/user/login', email, password);
    const response = await fetch('/api/product', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response)
    return response.json()
}

export const GetUsers = async () => {
    const response = await fetch("/api/user", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json()
}

export const GetCartData = async (token) => {
    const response = await fetch('/api/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: token
        },
    });
    return response.json()
}
  
export const AddToCart = async (productId) => {
    const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        },
        body: JSON.stringify({ productId }),
    });
    return response.json()
}

export const GetProductById = async (productId) => {
    console.log(productId)
    const response = await fetch('/api/product/' + productId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}
  
export const GetUserOrders = async () => {
    const response = await fetch('/api/order', {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        },
    })
    return response.json()
}

export const GetAllOrders = async () => {
    const response = await fetch('/api/adminOrder', {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        },
    })
    return response.json()
}
  
export const DeleteFromCart = async (productId,all) => {
    console.log("productId",productId)
    const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        },
        body: JSON.stringify({ productId, all}),
    });
    return response.json()
}

export const DeleteProduct = async (productId) => {
    console.log(productId)
    const response = await fetch('/api/product/' + productId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}

export const CreateProduct = async (data) => {
    const response = await fetch("/api/product/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem('token'),
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const OrderStatus = async (orderId, status) => {
    const response = await fetch('/api/adminOrder/' + orderId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({status:status})
    });
    return response.json()
}

export const OrderDelete = async (orderId) => {
    console.log(orderId)
    const response = await fetch('/api/adminOrder/' + orderId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}

export const OrderProduct = async (orderData) => {
    const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        },
        body: JSON.stringify( orderData ),
    });
    return response.json()
}

export const SendFeedback = async (formData) => {
    const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    return response.json()
  }