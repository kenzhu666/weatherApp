//import the react object from this react package that live inside package.json
import React from "react";

import Title from "./components/Title"
import Form from "./components/Form"
import Weather from "./components/Weather"

//initialize component, React.Component live in node_modules

const API_KEY = "22ef0fd26eb102ee2c6a25b3a551c054";


//react components can be of 2 types :
//1. class-base components which we have used all the files
//2. stateless functional components (dont contain any states)


class App extends React.Component {

    //*state is responsible for keeping track of changing data within a component
    //*state is an object, and it contained key value pair
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }  



    getWeather = async (e) => {
        //e just an event object
        //* the purpose is to prevent full screen refresh (signified for single page application)
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        console.log(data);

        if(city && country){ //the following gonna display only if city and country both been entered
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        }else{
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "please enter city and country"
            });
        }
    }

    //json: javascript object notion, aka convert the data we get from api to a readable format that any program language can understand
    render(){
        return(
            //only return one single div
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Title />
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form getWeather={this.getWeather}/>
                                    <Weather 
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




//Make "App" component available for other files to import it
export default App;

