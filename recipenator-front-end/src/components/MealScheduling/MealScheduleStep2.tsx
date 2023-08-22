import { createStore, useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';





const MealScheduleStep1 = () => {
  const navigate = useNavigate();

  return (
    <form>
      <p>Step2</p>
        <button onClick={() => navigate('')}> Forward </button>
        <button onClick={() => navigate('/schedulemeals/1')}>Back</button>
    </form>
  )

}  
 
export default MealScheduleStep1;
