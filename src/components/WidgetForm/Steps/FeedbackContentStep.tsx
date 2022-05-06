import axios from "axios";
import { ArrowArcLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedBackTypes } from "..";
import { api } from "../../../lib/api";
import CloseButton from "../../CloseButton";
import Loading from "../../Loading";
import ScreenshotButton from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType,
    onFeedbackRestartRequested: () => void
    onFeedbackSent: () => void
}

function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
    const feedbackTypeInfo = feedBackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendFeedback] = useState(false);

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendFeedback(true);
        api.post('/feedbacks', {
            type: feedbackType,
            comment: comment,
            screenshot: screenshot
        }).then((resp) => {
            console.log(resp);
            setIsSendFeedback(false);
        }).catch((err) => {

        }).finally(() => {
            setIsSendFeedback(false);
        });
        onFeedbackSent();


    }
    return (
        <>
            <header className="flex items-center justify-center">
                <button
                    onClick={onFeedbackRestartRequested}
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowArcLeft weight="bold" className="w-4 h-4" />
                </button>

                <span className=" text-xl leading-6 flex items-center gap-2">
                    <img
                        className="w-6 h-6"
                        src={feedbackTypeInfo.image.source}
                        alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>


            <form
                onSubmit={handleSubmitFeedback}
                className="my-4 w-full">
                <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes oque está acontecendo..."
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button
                        disabled={!comment || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex  justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                        type="submit"
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>
                </footer>
            </form>
        </>

    )
}

export default FeedbackContentStep