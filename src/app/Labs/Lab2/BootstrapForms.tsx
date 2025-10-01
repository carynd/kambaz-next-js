"use client";
import { Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>
      
      {/* FIX: Wrapped in FormGroup for proper structure and spacing */}
      <FormGroup className="mb-3">
        <FormLabel>Email address</FormLabel>
        <FormControl type="email" placeholder="name@example.com" />
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Example textarea</FormLabel>
        <FormControl as="textarea" rows={3} />
      </FormGroup>

      <div id="wd-css-styling-dropdowns" className="mb-3">
        <h3>Dropdowns</h3>
        {/* FIX: Used FormSelect */}
        <FormSelect>
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </FormSelect>
      </div>

      <div id="wd-css-styling-switches" className="mb-3">
        <h3>Switches</h3>
        {/* FIX: Used FormCheck */}
        <FormCheck type="switch" label="Unchecked switch checkbox input" />
        <FormCheck type="switch" label="Checked switch checkbox input" defaultChecked />
        <FormCheck type="switch" label="Unchecked disabled switch checkbox input" disabled />
        <FormCheck type="switch" label="Checked disabled switch checkbox input" defaultChecked disabled />
      </div>

      <div id="wd-css-styling-range-and-sliders" className="mb-3">
        <h3>Range</h3>
        {/* FIX: Used FormGroup and FormRange */}
        <FormGroup>
          <FormLabel>Example range</FormLabel>
          <FormRange min="0" max="5" step="0.05" />
        </FormGroup>
      </div>

      <div id="wd-css-styling-addons" className="mb-3">
        <h3>Addons</h3>
        {/* FIX: Used InputGroupText */}
        <InputGroup className="mb-3">
          <InputGroupText>$</InputGroupText>
          <InputGroupText>0.00</InputGroupText>
          <FormControl />
        </InputGroup>
        <InputGroup>
          <FormControl />
          <InputGroupText>$</InputGroupText>
          <InputGroupText>0.00</InputGroupText>
        </InputGroup>
      </div>

      <hr />

      {/* FIX: Corrected responsive forms with FormGroup and controlId in the right place */}
      <div id="wd-css-responsive-forms-1">
        <h3>Responsive forms</h3>
        <FormGroup as={Row} className="mb-3" controlId="email1">
          <FormLabel column sm={2}>Email</FormLabel>
          <Col sm={10}>
            <FormControl type="email" defaultValue="email@example.com" />
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="password1">
          <FormLabel column sm={2}>Password</FormLabel>
          <Col sm={10}>
            <FormControl type="password" />
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="textarea2">
          <FormLabel column sm={2}>Bio</FormLabel>
          <Col sm={10}>
            <FormControl as="textarea" style={{ height: "100px" }} />
          </Col>
        </FormGroup>
      </div>

      <hr />
      
      {/* FIX: Corrected second responsive form block */}
      <div id="wd-css-responsive-forms-2">
        <h3>Responsive forms 2</h3>
        <Form>
          <FormGroup as={Row} className="mb-3" controlId="formHorizontalEmail">
            <FormLabel column sm={2}>Email</FormLabel>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup as={Row} className="mb-3" controlId="formHorizontalPassword">
            <FormLabel column sm={2}>Password</FormLabel>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>
          
          <fieldset>
            <FormGroup as={Row} className="mb-3">
              <FormLabel as="legend" column sm={2}>Radios</FormLabel>
              <Col sm={10}>
                <FormCheck type="radio" label="First radio" name="formHorizontalRadios" defaultChecked />
                <FormCheck type="radio" label="Second radio" name="formHorizontalRadios" />
                <FormCheck type="radio" label="Third radio" name="formHorizontalRadios" />
              </Col>
            </FormGroup>
          </fieldset>
          
          <FormGroup as={Row} className="mb-3">
             <Col sm={{ span: 10, offset: 2 }}>
                <FormCheck label="Remember me" />
             </Col>
          </FormGroup>

          <FormGroup as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}