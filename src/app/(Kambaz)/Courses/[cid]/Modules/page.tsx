/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";
import { updateModule, editModule, setModules } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, createdModule]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid as string, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid as string, module);
    const newModules = modules.map((m: any) => m._id === module._id ? module : m);
    dispatch(setModules(newModules));
  };

  return (
    <div>
      {/* Only FACULTY can see add module buttons */}
      {currentUser?.role === "FACULTY" && (
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={onCreateModuleForCourse}
        />
      )}
      <br /><br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((module: any) => (
            <ListGroup.Item
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {/* Only FACULTY can edit module names */}
                {module.editing && currentUser?.role === "FACULTY" && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onUpdateModule({ ...module, name: e.target.value, editing: false });
                      }
                    }}
                    onBlur={(e: any) => {
                      if (module.editing) {
                        onUpdateModule({ ...module, name: e.target.value, editing: false });
                      }
                    }}
                    autoFocus
                  />
                )}

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroup.Item
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      {/* Only FACULTY can see lesson control buttons */}
                      {currentUser?.role === "FACULTY" && (
                        <LessonControlButtons />
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </div>
  );
}
