const url = () => {
    if(process.env.NODE_ENV === 'development') {
        return 'http://localhost:8861'
    }
    return "";
}

export const baseAPIUrl = url();