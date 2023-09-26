import React, { useState, useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const useList = (data, name) => {
  if (data !== null) {
    var dict = Object.keys(data).map((key, index) => {
      // console.log(data[index].department_name);
      // var string = data[index] + "." + name;
      if (name === "position") {
        return {
          value: data[index].id,
          label: data[index][name],
        };
      }
      return {
        value: data[index].id,
        label: data[index][name],
      };
    });
    return dict;
  } else {
    return [];
  }
};
