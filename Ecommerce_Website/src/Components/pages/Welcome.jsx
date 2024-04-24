
import Robot from '../../assets/robot.gif'

export default function Welcome() {

  return (
    <div className="flex justify-center items-center w-3/4 flex-col text-white">
      <img src={Robot} alt="" className="h-80" />
      <h1>
        Welcome <span className="text-blue-500">!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </div>
  );
}
