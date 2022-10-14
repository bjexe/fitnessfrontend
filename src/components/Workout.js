import React from 'react'
import Exercise from './Exercise'
import {v4 as uuidv4} from 'uuid'

export default function Workout({workoutData, active}){

  const [data, setData] = React.useState(workoutData);

  const exerciseDisplays = data.map((entry) => {
      return <Exercise data={entry} key={entry.id} setData={setData} handleClick={handleClick} active={active}/>
  })

  function submitWorkout() {
    // todo: save workout to database and close the workout screen
  }

  function handleClick(event) {

    const {name, id} = event.target;
    
    if(name === "del"){

      setData((oldData) => {

        let newData = [...oldData]; // state arrays result in React not re-rendering when a value of the state array changes, this fixes it (pointers I suppose)
  
        for(let i = 0; i < newData.length; i++) { // loop through the old data until the right exercise containing the targeted set to delete is found
          
          let sets = newData[i].sets; 

          for(let j = 0; j < sets.length; j++) {

            if(sets[j].id === id){
              newData[i].sets.splice(j, 1); // delete the set from the array
            }

          }

        }

        return newData;
      });
    } else if (name === "addExercise"){

      setData((oldData) => {

        return [...oldData, { //make this an empty exercise when things are editable
          id: uuidv4(),
          name: "New Exercise",
          finished: false,
          sets: []
        }];

      });

    } else if (name === "addSet") {

      console.log("attempting to add a set...")

      setData((oldData) => {
        
        let newData = [...oldData];

        for(let i = 0; i < newData.length; i++) {
          if(newData[i].id === id) {
            newData[i].sets.push({
              id: uuidv4(),
              weight: 0,
              reps: 0,
              comment: ""
            });
          }
        }

        return newData;

      });
    } else if (name === "finish") {
      console.log("toggling data.finished")
      setData((oldData) => {
        let newData = [...oldData];
        for(let i = 0; i < newData.length; i++) {
          if(newData[i].id === id) {
            newData[i].finished = !newData[i].finished;
          }
        }
        return newData;
      });
    }
    
  }

  return(
      <div className='home'>
          <div className='exercises-container'>
              {exerciseDisplays}
          </div>
          {active && <button onClick={submitWorkout}>Finish workout</button>}
          {active && <button onClick={handleClick} name={"addExercise"}>Add an exercise</button>}
      </div>
  );

}