/* eslint-disable @typescript-eslint/semi */
import { overOutField, onClickField } from './inputFields';
import './auth.css';

const lgField: HTMLElement | boolean =
  document.getElementById('login') ?? false;
const pwField: HTMLElement | boolean =
  document.getElementById('password') ?? false;

overOutField(lgField as HTMLSelectElement);
onClickField(lgField as HTMLSelectElement);

overOutField(pwField as HTMLSelectElement);
