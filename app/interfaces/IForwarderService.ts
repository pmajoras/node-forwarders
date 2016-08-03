'use strict';
import {IForwarder} from './IForwarder';

export interface IForwarderService extends IForwarder {
  onInit(): void;
  onFinish(): void;
  onForwardError(): void;
  onForwardSuccess(): void;
  onForwardStart(): void;
}
