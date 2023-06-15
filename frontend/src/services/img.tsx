import { useFetch } from "./infra";

export type Img = {
    id: string;
    acc: string
    image: string;
}

export function useBook(id: string){
    let res = useFetch<Img>(`/api/imgs/${id}`);
    return {
        book: res.error ? undefined : res.data,
        ...res,
    };
}

export type ImgsDict = Record<string, Img>;

export function useImgs(keyword: string | undefined){
    var link
    if(keyword !== undefined)
        link = `/api/imgs/` + keyword;
    else 
        link = `/api/imgs`;
    console.log("search link -> ", link)
    let res = useFetch<ImgsDict>(link);
    return {
        imgs: res.error ? undefined : res.data,
        ...res,
    };
}
