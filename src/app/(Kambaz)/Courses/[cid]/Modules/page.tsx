import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
  <ListGroup className="rounded-0" id="wd-modules">
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" />
       Week 1 <ModuleControlButtons /></div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
           <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
 </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" />
          Learn what is Web Development <LessonControlButtons />
        </ListGroupItem>
      </ListGroup>
    </ListGroupItem>
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Week 2
      <ModuleControlButtons /></div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" /> LESSON 1 <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" /> LESSON 2 <LessonControlButtons />
        </ListGroupItem>
      </ListGroup>
    </ListGroupItem>
  </ListGroup>
  {/*

      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Read Chapter 1</li>
                <li className="wd-content-item">Read Chapter 1.2</li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Slideshow 1</li>
                <li className="wd-content-item">Slideshow 2</li>
                <li className="wd-content-item">Slideshow 3</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Read Chapter 1</li>
                <li className="wd-content-item">Read Chapter 1.2</li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Slideshow 1</li>
                <li className="wd-content-item">Slideshow 2</li>
                <li className="wd-content-item">Slideshow 3</li>
              </ul>
            </li>
          </ul>
        </li>
        <div className="wd-title">Week 3</div>
        <ul className="wd-lessons">
          <li className="wd-lesson">
            <span className="wd-title">LEARNING OBJECTIVES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Introduction to the course</li>
              <li className="wd-content-item">Learn what is Web Development</li>
            </ul>
          </li>
          <li className="wd-lesson">
            <span className="wd-title">READING</span>
            <ul className="wd-content">
              <li className="wd-content-item">Read Chapter 1</li>
              <li className="wd-content-item">Read Chapter 1.2</li>
            </ul>
          </li>

          <li className="wd-lesson">
            <span className="wd-title">SLIDES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Slideshow 1</li>
              <li className="wd-content-item">Slideshow 2</li>
              <li className="wd-content-item">Slideshow 3</li>
            </ul>
          </li>
        </ul>
        <div className="wd-title">Week 4</div>
        <ul className="wd-lessons">
          <li className="wd-lesson">
            <span className="wd-title">LEARNING OBJECTIVES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Introduction to the course</li>
              <li className="wd-content-item">Learn what is Web Development</li>
            </ul>
          </li>
          <li className="wd-lesson">
            <span className="wd-title">READING</span>
            <ul className="wd-content">
              <li className="wd-content-item">Read Chapter 1</li>
              <li className="wd-content-item">Read Chapter 1.2</li>
            </ul>
          </li>

          <li className="wd-lesson">
            <span className="wd-title">SLIDES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Slideshow 1</li>
              <li className="wd-content-item">Slideshow 2</li>
              <li className="wd-content-item">Slideshow 3</li>
            </ul>
          </li>
        </ul>
        <div className="wd-title">Week 5</div>
        <ul className="wd-lessons">
          <li className="wd-lesson">
            <span className="wd-title">LEARNING OBJECTIVES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Introduction to the course</li>
              <li className="wd-content-item">Learn what is Web Development</li>
            </ul>
          </li>
          <li className="wd-lesson">
            <span className="wd-title">READING</span>
            <ul className="wd-content">
              <li className="wd-content-item">Read Chapter 1</li>
              <li className="wd-content-item">Read Chapter 1.2</li>
            </ul>
          </li>

          <li className="wd-lesson">
            <span className="wd-title">SLIDES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Slideshow 1</li>
              <li className="wd-content-item">Slideshow 2</li>
              <li className="wd-content-item">Slideshow 3</li>
            </ul>
          </li>
        </ul>
        <div className="wd-title">Week 6</div>
        <ul className="wd-lessons">
          <li className="wd-lesson">
            <span className="wd-title">LEARNING OBJECTIVES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Introduction to the course</li>
              <li className="wd-content-item">Learn what is Web Development</li>
            </ul>
          </li>
          <li className="wd-lesson">
            <span className="wd-title">READING</span>
            <ul className="wd-content">
              <li className="wd-content-item">Read Chapter 1</li>
              <li className="wd-content-item">Read Chapter 1.2</li>
            </ul>
          </li>

          <li className="wd-lesson">
            <span className="wd-title">SLIDES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Slideshow 1</li>
              <li className="wd-content-item">Slideshow 2</li>
              <li className="wd-content-item">Slideshow 3</li>
            </ul>
          </li>
        </ul>
        <div className="wd-title">Week 7</div>
        <ul className="wd-lessons">
          <li className="wd-lesson">
            <span className="wd-title">LEARNING OBJECTIVES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Introduction to the course</li>
              <li className="wd-content-item">Learn what is Web Development</li>
            </ul>
          </li>
          <li className="wd-lesson">
            <span className="wd-title">READING</span>
            <ul className="wd-content">
              <li className="wd-content-item">Read Chapter 1</li>
              <li className="wd-content-item">Read Chapter 1.2</li>
            </ul>
          </li>

          <li className="wd-lesson">
            <span className="wd-title">SLIDES</span>
            <ul className="wd-content">
              <li className="wd-content-item">Slideshow 1</li>
              <li className="wd-content-item">Slideshow 2</li>
              <li className="wd-content-item">Slideshow 3</li>
            </ul>
          </li>
        </ul>
      </ul> */}
    </div>
  );
}
