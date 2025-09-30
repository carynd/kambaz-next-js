export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <br></br>
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        {/* Complete on your own */}
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group" value="ASSIGNMENTS">
              <option>ASSIGNMENTS</option>
              <option>EXAMS</option>
              <option>PROJECTS</option>
            </select>
          </td>
        </tr>

        <br></br>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as" value="Percentage">
              <option>Percentage</option>
              <option>Points</option>
            </select>
          </td>
        </tr>

        <br></br>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option>Online</option>
              <option>On Paper</option>
              <option>No Submission</option>
            </select>
          </td>
        </tr>

        <br></br>

        <tr>
          <td></td>
          <td>
            <div>
              Online Entry Option
              <div>
                <input type="checkbox" id="wd-text-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label>
              </div>
              <div>
                <input type="checkbox" id="wd-website-url" />
                <label htmlFor="wd-website-url">Website URL</label>
              </div>
              <div>
                <input type="checkbox" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recording</label>
              </div>
              <div>
                <input type="checkbox" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation">
                  Student Annotation
                </label>
              </div>
              <div>
                <input type="checkbox" id="wd-file-upload" />
                <label htmlFor="wd-file-upload">File Upload</label>
              </div>
            </div>
          </td>
        </tr>

        <br></br>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <div>
              <label htmlFor="wd-assign-to">Assign To</label>
              <br></br>
              <input id="wd-assign-to" value="Everyone" />
            </div>

            <br></br>
            <div>
              <label htmlFor="wd-due-date">Due</label>
              <br></br>
              <input type="date" id="wd-due-date" />
            </div>

            <br></br>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="wd-available-from">Available From</label>
                  </td>
                  <td>
                    <label htmlFor="wd-available-until">Until</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="date" id="wd-available-from" />
                  </td>
                  <td>
                    <input type="date" id="wd-available-until" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
      <hr></hr>
      <div style={{ textAlign: "right" }}>
        <button id="wd-cancel">Cancel</button>
        &nbsp;
        <button id="wd-save">Save</button>
      </div>
    </div>
  );
}
