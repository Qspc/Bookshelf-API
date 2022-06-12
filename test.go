package main

import "fmt"
import "encoding/json"



type Book struct {
	Title string `json:"title"`
	Author string `json:"author"`
}

func main(){
	halo := 10
	fmt.Println(halo)
	book := Book{Title:"sang pencerah", Author:"tere liye"}

	byteArray, err := json.Marshal(book)

	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(byteArray))
}