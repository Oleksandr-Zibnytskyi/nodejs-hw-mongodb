import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginWithGoogleOAuthSchema, registerUserSchema, loginUserSchema, requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';
import { loginWithGoogleController, getGoogleOAuthUrlController, registerUserController, loginUserController, logoutUserController, refreshUserSessionController, requestResetEmailController, resetPasswordController  } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController),);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', jsonParser, ctrlWrapper(refreshUserSessionController));

router.post('/send-reset-email', jsonParser, validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

router.post('/reset-pwd', jsonParser, validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

router.post('/confirm-oauth', validateBody(loginWithGoogleOAuthSchema), ctrlWrapper(loginWithGoogleController),);

export default router;
