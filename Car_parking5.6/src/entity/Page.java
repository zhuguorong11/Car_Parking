package entity;

import java.util.List;

//∑÷“≥¿‡
public class Page {
	private int currentPage;
	private int pageSize;
	private int totalCount;
	private int totalPages;
	private List<Parks> parkList;
	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}


	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public List<Parks> getParkList() {
		return parkList;
	}

	public void setParkList(List<Parks> parkList) {
		this.parkList = parkList;
	}

}
