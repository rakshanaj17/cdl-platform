import create from 'zustand';

/**
 * A custom store for managing the state of the CDL progress bar.
 * 
 * @typedef {Object} CDLProgressBarStore
 * 
 *  @property {boolean} isProgressBarOpen - Indicates whether the progress bar is open or not.
 * @property {function} openProgressBar - Opens the progress bar with the specified message.
 * @property {function} closeProgressBar - Closes the progress bar.
 * @property {function} setProgressBarProps - Sets the specified properties of the progress bar.
 * 
 */
const useCDLProgressBarStore = create((set) => ({
    isProgressBarOpen: false,
    openProgressBar: (progressBarMessage) => {
        set({ isProgressBarOpen: true, progressBarMessage: progressBarMessage });
    },
    closeProgressBar: () => {
        set({ isProgressBarOpen: false });
    },
    setProgressBarProps: (props) => set((state) => ({ ...state, ...props })),
}));

export default useCDLProgressBarStore;
