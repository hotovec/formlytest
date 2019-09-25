import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {HttpClient} from '@angular/common/http';
import {FormlyJsonschema} from '@ngx-formly/core/json-schema';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'formlytest';

  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];


  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
  ) {
    this.loadExample('nested');
  }

  loadExample(type: string) {
    this.http.get<any>(`assets/json-schema/${type}.json`).pipe(
      tap(({ schema, model }) => {
        this.form = new FormGroup({});
        this.options = {};
        this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        this.model = model;
      }),
    ).subscribe();
  }

  submit() {
    alert(JSON.stringify(this.model));
  }


}
