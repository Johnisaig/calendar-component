import { CustomCalendar } from './components/molecules';
import calendarIcon from './assets/png/calendar.png';

import './App.css';

function App() {
  return (
    <div>
      <CustomCalendar
        id="calandar-id"
        type="text"
        iconPath={calendarIcon}
        placeHolder="YYYY-MM-DD"
        handleChange={(date: string) => console.log(`Date: ${date}`)}
      />
    </div>
  );
}

export default App;
