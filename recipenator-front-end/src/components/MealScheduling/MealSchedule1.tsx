import { useNavigate } from "react-router-dom";

const MealSchedule = () => {
  const navigate = useNavigate();

  return (
    <form>
        <p>Step1</p>
        <button onClick={() => navigate('/schedulemeals/2')}>Forward</button>
        <button onClick={() => navigate('/')}>Back</button>
    </form>
  )
};

export default MealSchedule;