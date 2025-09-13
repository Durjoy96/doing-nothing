import React from "react";

export default function LeaderboardInputModal() {
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
        <form>
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
                className="input input-neutral w-full"
                placeholder="eg. john"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                X (Twitter) username{" "}
                <span className="text-warning">(optional)</span>
              </legend>
              <input
                type="text"
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
                type="link"
                className="input input-neutral w-full"
                placeholder=""
                defaultValue="https://"
              />
            </fieldset>
          </div>
          <button className="btn btn-primary btn-md rounded-full w-full mt-8">
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
}
