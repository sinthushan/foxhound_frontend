import { HttpInterceptorFn } from "@angular/common/http";

export const authIntercepter: HttpInterceptorFn = (request, next)=>{
    const access_tkn = localStorage.getItem('access_tkn') ?? '';
    console.log(access_tkn)
    request = request.clone({
        setHeaders:{
            Authorization: access_tkn ? `Bearer ${access_tkn}` : ''
        }
    })

    return next(request);

}