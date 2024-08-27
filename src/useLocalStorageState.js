import { useState,useEffect } from "react";

export function useLocalStorageState(initialState,key){
    const [value, setValue] = useState(function(){
        const watchedStore = localStorage.getItem(key)
        return watchedStore ? JSON.parse(watchedStore) : initialState
      }
      )

      useEffect(function(){
        localStorage.setItem(key,JSON.stringify(value))
      },[value,key])

    return [value,setValue]
}
