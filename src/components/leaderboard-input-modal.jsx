import React, { useState } from "react";
import { apiFetch } from "../../utils/apiFetch";
import { useValue } from "@/lib/provider";
import toast from "react-hot-toast";
import { Check, LoaderCircle, SendHorizonal } from "lucide-react";

export default function LeaderboardInputModal() {
  const { gameOverReason, totalSeconds } = useValue();

  const [disableBtn, setDisableBtn] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    const form = e.target;
    const name = form.name.value;
    const username = form.username.value;
    const websiteUrl = form.websiteUrl.value;
    const data = {
      name,
      username,
      websiteUrl,
      gameOverReason,
      totalSeconds,
    };
    try {
      const result = await apiFetch("api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(result.success);
      console.log(result);
      if (result.success) {
        toast.success(result.message);
        setSubmissionSuccess(true);
        form.reset(); //reset the form
        //   console.log("success", result);
      }
    } catch (error) {
      toast.error(error.message);
      setDisableBtn(false);
      //   console.error(error.message);
    }
  };
  return (
    <dialog
      data-theme="forest"
      id="leaderboard-input-modal"
      className="modal font-inter"
    >
      <div className="modal-box max-w-sm">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={formHandler}>
          <h3 className="font-bold text-xl mt-2 text-base-content">
            Want your name on the leaderboard?
          </h3>
          <div className="mt-2 w-full">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Your name<span className="text-error">required *</span>
              </legend>
              <input
                type="text"
                name="name"
                className="input input-neutral w-full"
                placeholder="eg. john"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                X (Twitter) username{" "}
                <span className="text-warning">(optional)</span>
              </legend>
              <input
                type="text"
                name="username"
                className="input input-neutral w-full"
                placeholder="eg. @john"
                defaultValue="@"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Your website URL{" "}
                <span className="text-warning">(optional)</span>
              </legend>
              <input
                type="text"
                name="websiteUrl"
                className="input input-neutral w-full"
                placeholder=""
                defaultValue="https://"
              />
            </fieldset>
          </div>
          <button
            disabled={disableBtn}
            className="btn btn-primary btn-md rounded-full w-full mt-8 disabled:bg-accent"
          >
            {disableBtn ? (
              submissionSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Done
                </>
              ) : (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              )
            ) : (
              <>
                <SendHorizonal className="w-4 h-4" /> Submit
              </>
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
}
