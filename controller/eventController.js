import Event from '../models/eventModel.js';
import Category from '../models/categoryModel.js';
import {
  successSendData,
  successSendMessage,
  errorsSendMessage
} from '../utils/successResponse.js';
import asyncMiddleware from './../middleware/asyncMiddleware.js';
import * as BaseService from '../utils/baseService.js';
import { listPictures } from '../helper/api.js';

export const CreateNewEvent = asyncMiddleware(async (req, res, next) => {
  const { title, description, startDate, endDate, percent, status, typeEvent } = req.body;

  if (!req.files) {
    return errorsSendMessage(500, 'No file', res);
  }
  const images = listPictures(req.files, res);
  const createdEvent = await BaseService.create(Event, {
    title,
    description,
    startDate,
    endDate,
    percent,
    images,
    status,
    typeEvent
  });
  return successSendData(201, createdEvent, res);
});

export const UpdateEventById = asyncMiddleware(async (req, res, next) => {
  const { title, description, startDate, endDate, percent, status, typeEvent } = req.body;
  const { eventId } = req.params;
  const images = listPictures(req.files, res);
  const updatedEvent = await BaseService.findOneAndUpdate(
    Event,
    { _id: eventId },
    {
      title,
      description,
      startDate,
      endDate,
      percent,
      images,
      status,
      typeEvent
    },
    { new: true }
  );
  if (!updatedEvent) {
    throw errorsSendMessage(404, `No event has id ${eventId}`, res);
  }
  return successSendData(200, updatedEvent, res);
});
export const GetEventById = asyncMiddleware(async (req, res, next) => {
  const { eventId } = req.params;
  const event = await BaseService.findOne(Event, { _id: eventId });
  if (!event) {
    throw errorsSendMessage(404, `No Event has id ${eventId}`, res);
  }
  return successSendData(200, event, res);
});
export const getAllEvent = asyncMiddleware(async (req, res, next) => {
  const { page, perPage } = req.query;
  const events = await BaseService.getAll(
    Event,
    null,
    null,
    null,
    page,
    perPage
  );
  if (!events.length) {
    return errorsSendMessage(404, 'No events', res);
  }
  return successSendData(200, events, res);
});
export const cancelEventById = asyncMiddleware(async (req, res, next) => {
  const { eventId } = req.params;
  const eventCancel = await BaseService.findOneAndUpdate(
    Event,
    {
      _id: eventId,
      status: true
    },
    { status: false }
  );
  if (!eventCancel) {
    return errorsSendMessage(404, `No event has id ${eventId}`, res);
  }
  return successSendData(200, `Event id ${eventId} canceled successfully`, res);
});

export const deleteEventById = asyncMiddleware(async (req, res, next) => {
  const { eventId } = req.params;
  const event = await BaseService.findOneAndDelete(Event, {
    _id: eventId
  });
  if (!event) {
    return errorsSendMessage(404, `No event has id ${eventId}`, res);
  }
  return successSendData(200, 'Delete event Successfully', res);
});
