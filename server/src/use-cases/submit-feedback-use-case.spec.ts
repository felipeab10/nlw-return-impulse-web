import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail:sendMailSpy }
);
describe('Submit feedback',() => {

it('should be able to submit a feedback', async () => {
   await expect(submitFeedback.execute({
        type:'BUG',
        comment:'TETAS',
        screenshot:'data:image/png;base64,foto.png'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
});

it('should not be able submit feedback without type', async () => {
    await expect(submitFeedback.execute({
        type:'',
        comment:'TETAS',
        screenshot:'data:image/png;base64,foto.png'
    })).rejects.toThrow();
});

it('should not be able submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
        type:'BUG',
        comment:'',
        screenshot:'data:image/png;base64,foto.png'
    })).rejects.toThrow();
});

it('should not be able submit feedback with screenshot invalid extension', async () => {
    await expect(submitFeedback.execute({
        type:'BUG',
        comment:'teste',
        screenshot:'aaaa.png'
    })).rejects.toThrow();
});


});