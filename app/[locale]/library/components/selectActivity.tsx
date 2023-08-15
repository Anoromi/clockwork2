"use client";

import RippleButton from "@/app/components/ripple-button";
import { getUserExercises } from "@/app/utils/load";
import styles from "@/app/[locale]/library/components/selectActivity.module.scss";
import { Listbox } from "@headlessui/react";
import utilStyles from "@/app/styles/utils.module.scss";
import { useReactive } from "@/app/components/useReactive";
import { getDb, IActivity } from "@/app/backend/database";
import classNames from "classnames";
import { Icon } from "@iconify/react";
import { useGetActivityQuery } from "../api";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import { selectActivity } from "../libraryStore";
import { useRipple } from "@/app/components/useRipple";
import { surfaceColoring } from "@/app/styles/coloring";

export function LibrarySelectActivity() {
  const data = useGetActivityQuery();
  //const selectedActivity = useReactive<IActivity | null>(null);
  const selectedActivity = useAppSelector(
    (state) => state.library.records.selectedActivity,
  );
  const dispatch = useAppDispatch();

  const onActivityChange = (activity: IActivity | null) =>
    dispatch(selectActivity(activity));

  return (
    <>
      <span className={styles.listbox}>
        <Listbox value={selectedActivity} onChange={onActivityChange}>
          <Listbox.Button className={utilStyles.contents}>
            {(state) => (
              <RippleButton as="div" className={styles.listboxButton}>
                {selectedActivity?.name ?? "Activity"}
                <Icon icon="octicon:chevron-down-12" fontSize={24} />
              </RippleButton>
            )}
          </Listbox.Button>

          <Listbox.Options className={styles.options}>
            <ActivityOption key={"Empty"} value={null}>
              None
            </ActivityOption>
            {data.isLoading ? (
              <></>
            ) : (
              data.data!.map((activity) => (
                <ActivityOption value={activity} key={activity.id}>
                  {activity.name}
                </ActivityOption>
              ))
            )}
          </Listbox.Options>
        </Listbox>
      </span>
    </>
  );
}

function ActivityOption({
  value,
  children,
}: React.PropsWithChildren<{ value: IActivity | null }>) {
  const { buttonData, rippleData } = useRipple({
    withElevation: false,
  });

  return (
    <Listbox.Option
      value={value}
      {...buttonData}
      className={({ active }) =>
        classNames(styles.option, surfaceColoring.surfaceNormal, {
          [surfaceColoring.surfaceElevated]: active,
        })
      }
    >
      <div {...rippleData}></div>
      {children}
    </Listbox.Option>
  );
}
