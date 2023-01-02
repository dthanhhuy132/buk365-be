import { getPanel, listPictures } from '../helper/api.js';
import asyncMiddleware from '../middleware/asyncMiddleware.js';
import Category from '../models/categoryModel.js';
import Panel from '../models/panelModel.js';
import {
  create,
  findOne,
  findOneAndUpdate,
  getAll
} from '../utils/baseService.js';
import {
  errorsSendMessage,
  successSendData,
  successSendMessage
} from '../utils/successResponse.js';

export const getAllPanel = asyncMiddleware(async (req, res) => {
  const panel = await getAll(Panel, res);
  if (!panel) {
    throw errorsSendMessage(404, 'No panel!', res);
  }
  return successSendData(201, panel, res);
});

export const getPaneById = asyncMiddleware(async (req, res) => {
  const { panelId } = req.params;

  const panel = await getPanel(panelId);

  return successSendData(200, panel, res);
});

export const createPanel = asyncMiddleware(async (req, res) => {
  const { categoryId, description } = req.body;
  const category = await findOne(Category, { _id: categoryId });

  if(category) {
    if (!category) {
      throw errorsSendMessage(404, 'Category is not found', res);
    }
  }
  
  const pictures = listPictures(req.files, res);

  const panel = await create(Panel, {
    categoryId: categoryId ? categoryId : null,
    description,
    pictures
  });

  return successSendData(200, panel, res);
});

export const updatePanel = asyncMiddleware(async (req, res) => {
  const { panelId } = req.params;

  const pictures = listPictures(req.files, res);

  const panel = await Panel.findOneAndUpdate(
    { _id: panelId },
    { ...req.body, pictures },
    { new: true }
  );

  if (!panel) {
    return errorsSendMessage(404, `No panel has id ${panelId}`, res);
  }

  return successSendData(200, panel, res);
});

export const cancelPanelById = asyncMiddleware(async (req, res) => {
  const { panelId } = req.params;

  const panel = await findOneAndUpdate(
    Panel,
    {
      _id: panelId,
      status: "active",
    },
    { status: "cancel" }
  );

  if (!panel) {
    return errorsSendMessage(404, `No promotion has id ${panelId}`, res);
  }

  return successSendData(
    200,
    `Panel id ${panelId} canceled successfully`,
    res
  );
});

export const deletePanel = asyncMiddleware(async (req, res) => {
  const { panelId } = req.params;

  const panel = await getPanel(panelId);
  
  if(!panel) {
    throw successSendMessage(400, "No panel!", res);
  }

  await Panel.deleteOne({_id: panel._id})
  
  return successSendMessage(200, "remove success!", res);
});